# Shelf Rendering Engine

![License](https://img.shields.io/badge/license-MPL--2.0-blue)
![Version](https://img.shields.io/badge/version-v0.1.4-orange)

A highly flexible rendering engine for virtual shelves, inventories, and catalog-like UIs, designed for Vue.js and powered by strict TypeScript models.

> [!WARNING]
> This is an early development release and currently not meant for production environments.
> All configuration options are subject to change at any point.

## Installation

Just run the following command in your project to install the engine.

```sh
npm install @tarobits/shelf-rendering-engine
```

Then add the following two lines to the imports in the file you wish to use the engine:

```ts
import '@tarobits/shelf-rendering-engine/style.css';
import { RenderableShelf, Shelf, type ShelfType, type ViewableShelf } from '@tarobits/shelf-rendering-engine';
```

## Usage

To create a shelf:

```ts
RenderableShelf.getShelfFromProps(shelfConfig).exportToViewable();
```

`shelfConfig` refers to an object matching the `ShelfType` type.

Or

```ts
RenderableShelf.getShelfFromProps(shelfDataConfig, shelfSizesConfig).exportToViewable();
```

`shelfDataConfig` and `shelfSizesConfig` refer to objects matching the `ShelfData` and `ShelfSizes` types respectively.

`getShelfFromProps` accepts either a full `ShelfType` object or a combination of `ShelfData` and `ShelfSizes` and returns a render-ready representation.

`exportToViewable` converts the class into a reactive class Vue can work with.

## Minimal Example

```ts
const shelf = RenderableShelf.getShelfFromProps({
    innerWidth: 100,
    innerHeight: 50,
    backgroundColor: '#eee',
    outerColor: '#333',
    topWidth: 3,
    bottomWidth: 3,
    leftWidth: 3,
    rightWidth: 3,
    model: []
}).exportToViewable();
```

## Data Types

> [!NOTE]
> All widths and heights are relational. You may use centimeters, inches, or any other form of measurement.
> They will all be converted into pixels on rendering.

### Main Types

<details>
<summary>ShelfType</summary>

```ts

{
  title: string, // (Optional) if you want a title to be displayed above your shelf
  subtitle: string, // (Optional) if you want a smaller text displayed below the title
  innerWidth: number, // (Required) how wide the shelf is from inner wall to inner wall
  innerHeight: number, // (Required) how tall the shelf is from inner bottom to inner top
  location: EntityLocation[], // (Optional) defines where the shelf is located (Purely meta data)
  backgroundColor: string, // (Required) what color to display in the background (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
  outerColor: string, // (Required) what color the shelf walls etc. are (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
  topWidth: number, // (Required) width of the top part of the shelf casing (0 if no top part exists)
  bottomWidth: number, // (Required) width of the bottom part of the shelf casing (0 if no bottom part exists)
  leftWidth: number, // (Required) width of the left part of the shelf casing (0 if no left part exists)
  rightWidth: number, // (Required) width of the right part of the shelf casing (0 if no right part exists)
  model: ShelfSection[] // (Required) an array of the shelf sections this shelf should contain.
}
```

</details>
<details>
<summary>ShelfSection</summary>

> [!NOTE]
> For shelf sections you can also use percentages for the height and width related to the shelf.
<!-- -->
> [!WARNING]
> bottom.width and wall.width will count towards the absolute size.

```ts
{
    width: number | string, // (Required) Width of the shelf section (Inner part)
    height: number | string, // (Required) Height of the shelf section (Inner part)
    x: number, // (Optional) If given the shelf will be at the given position inside the row. If left undefined, the section will be sorted at random
    y: number, // (Optional) If given the shelf will be inside the given row. If left undefined, the section will be sorted at random
    sortBooksInverted: boolean, // (Optional) If true the books will be sorted from right to left inside that section. Undefined or false will sort the books from left to right
    bottom: { // (Required) Section base definition
        width: number, // (Required) determines the thickness of the section base.
        color: string // (Optional) Color of the section base. If left undefined it will assume the value of the property outerColor of the parent shelf. (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
    }
    wall: { // (Optional) Section separation wall
        position: 'left' | 'right', // (Required) defines whether the wall will be rendered on the left or the right side of the section
        color: string, // (Optional) defines the color of the separation wall. If undefined it will assume the value of outerColor of the parent shelf (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
        width: number // (Required) defines how thick the wall is going to be
    }
    items: ShelfItem[] // (Required) an array of the shelf items this section contains
}
```

</details>
<details>
<summary>ShelfItem</summary>

```ts
{
    expandable: boolean, // (Required) determines whether the shelf item can be clicked on to display additional information
    width: number, // (Required) defines the width of the given item
    height: number, // (Required) defines the height of the given item
    depth: number, // (Required if expandable is true) defines the depth of the item when the detail view is opened
    frontView: FrontShelfView, // (Required) defines the view as it is displayed inside the shelf
    title: string, // (Required) defines the name of the item [Is displayed on the frontView if its type is "color" and it has not been disabled]
    subtitle: string, // (Optional) defines the subtitle of the item [Is displayed on the frontView if its type is "color" and it has not been disabled]
    description: string, // (Optional) defines the description of the item
    positionInRow: number, // (Optional) defines the position of the shelf item inside the section. If undefined the item will be sorted at random
    identificationCode: IdentificationCode[], // (Optional) defines the identification codes of the item (e.g. ISBN, Asset-ID, etc.)
    location: EntityLocation[], // (Optional) defines where the item is located (Purely meta data)
    availability: 'unlimited' | 'limited', // (Required) defines the availability of the item. If unlimited the item cannot be "out of stock"
    count: number, // (Required if availability is "limited") defines the number of available items
    sideView: SideShelfView, // (Required if expandable is true) defines the view as it is displayed when clicked on
}
```

</details>
<details>
<summary>FrontShelfView</summary>

If you wish you item to be displayed as a colored "block" use the following

```ts
{
    type: 'color', // (Required) defines that the color view type should be used
    color: string, // (Required) defines the color that the item should be displayed as (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255]) 
    exclude: { // (Optional) determines whether to display certain information on that cover
        title: boolean, // (Optional) determines whether the title should be rendered on the view
        subtitle: boolean // (Optional) determines whether the subtitle should be rendered on the view
    }
}
```

If you wish for the item to be displayed with an image use the following

```ts
{
    type: 'image', // (Required) defines that the image view type should be used
    url: string // (Required) defines the url of the image to display
}
```

</details>
<details>
<summary>SideShelfView</summary>

If you wish you item to be displayed as a colored "block" use the following

```ts
{
    type: 'color', // (Required) defines that the color view type should be used
    color: string, // (Required) defines the color that the item should be displayed as (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255]) 
    exclude: { // (Optional) determines whether to display certain information on that cover
        title: boolean, // (Optional) determines whether the title should be rendered on the view
        subtitle: boolean // (Optional) determines whether the subtitle should be rendered on the view
    },
    sideView: { // (Optional) defines how the sideView should be rendered
        style: { // (Optional) if you wish to change the display styles of the given properties
            background: DisplayStyle, // (Optional) if you wish to change the display background
            title: DisplayStyle, // (Optional) if you wish to change how the title is displayed
            subtitle: DisplayStyle, // (Optional) if you wish to change how the subtitle is displayed
            description: DisplayStyle, // (Optional) if you wish to change how the description is displayed
            location: Record<string, {
                key: DisplayStyle, // (Optional) if you wish to change how the key is displayed for this location
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for this location
            }> | {
                key: DisplayStyle, // (Optional) if you wish to change how the key is displayed for all locations
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for all locations
            }, // (Optional) if you wish to change how all the locations are displayed or how specific locations are displayed. [This setting will override the individual location configuration]
            identificationCode: Record<string, {
                name: DisplayStyle, // (Optional) if you wish to change how the name is displayed for this identification code
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for this identification code
            }> | {
                name: DisplayStyle, // (Optional) if you wish to change how the name is displayed for all identification codes
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for all identification codes
            } // (Optional) if you wish to change how all the identification codes are displayed or how specific identification codes are displayed.
        },
        exclude: { // (Optional) if you wish to exclude specific properties from rendering
            title: boolean, // (Optional) determines whether to render the title of the book [On the sideView]
            subtitle: boolean, // (Optional) determines whether to render the subtitle of the book [On the sideView]
            description: boolean, // (Optional) determines whether to render the description of the book
            location: boolean, // (Optional) determines whether to render the location of the item
            identificationCode: boolean | Array<string> // (Optional) determines whether to render identification codes at all or if specific ones should be excluded
        }
    }
}
```

If you wish for the item to be displayed with an image use the following

```ts
{
    type: 'image', // (Required) defines that the image view type should be used
    url: string, // (Required) defines the url of the image to display
    sideView: { // (Optional) defines how the sideView should be rendered
        style: { // (Optional) if you wish to change the display styles of the given properties
            background: DisplayStyle, // (Optional) if you wish to change the display background
            title: DisplayStyle, // (Optional) if you wish to change how the title is displayed
            subtitle: DisplayStyle, // (Optional) if you wish to change how the subtitle is displayed
            description: DisplayStyle, // (Optional) if you wish to change how the description is displayed
            location: Record<string, {
                key: DisplayStyle, // (Optional) if you wish to change how the key is displayed for this location
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for this location
            }> | {
                key: DisplayStyle, // (Optional) if you wish to change how the key is displayed for all locations
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for all locations
            }, // (Optional) if you wish to change how all the locations are displayed or how specific locations are displayed. [This setting will override the individual location configuration]
            identificationCode: Record<string, {
                name: DisplayStyle, // (Optional) if you wish to change how the name is displayed for this identification code
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for this identification code
            }> | {
                name: DisplayStyle, // (Optional) if you wish to change how the name is displayed for all identification codes
                value: DisplayStyle // (Optional) if you wish to change how the value is displayed for all identification codes
            } // (Optional) if you wish to change how all the identification codes are displayed or how specific identification codes are displayed.
        },
        exclude: { // (Optional) if you wish to exclude specific properties from rendering
            title: boolean, // (Optional) determines whether to render the title of the book [On the sideView]
            subtitle: boolean, // (Optional) determines whether to render the subtitle of the book [On the sideView]
            description: boolean, // (Optional) determines whether to render the description of the book
            location: boolean, // (Optional) determines whether to render the location of the item
            identificationCode: boolean | Array<string> // (Optional) determines whether to render identification codes at all or if specific ones should be excluded
        }
    }
}
```

</details>
<details>
<summary>DisplayStyle</summary>

```ts
{
    color: string, // (Optional) if you wish to change the color of the given property (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
    fontWeight: number, // (Optional) if you wish to change the fontWeight of the given property
    classes: Array<string> // (Optional) if you wish to apply specific CSS classes to the given property
}
```

</details>
<details>
<summary>EntityLocation</summary>

Display:
{key}: {value}

Example:
Shelf: 7
Row: 5

```ts
{
    key: string, // (Required) defines the location key
    value: string, // (Required) defines the value of the location
    order: number, // (Required) defines the order the location is displayed in
    style: { // (Optional) if you wish to change how this location is displayed
        key: DisplayStyle, // (Optional) if you wish to change how the key is displayed
        value: DisplayStyle // (Optional) if you wish to change how the value is displayed
    }
}
```

</details>
<details>
<summary>IdentificationCode</summary>

Display:
{name or display_name}: {value}
or if value is an array
{name or display_name}: {value[0]}
{name or display_name}: {value[1]}
...

```ts
{
    name: string, // (Required) defines the name of the location (Can also be used in the sideView exclude)
    display_name: string, // (Optional) if you wish to change the name that is displayed
    order: number, // (Optional) defines the order in which to display the identification codes
    value: string | Array<string> // (Required) can be a single string or an array of strings and defines the values of the given identification code
}
```

</details>

### Other Types

<details>
<summary>ShelfData</summary>

```ts

{
  title: string, // (Optional) if you want a title to be displayed above your shelf
  subtitle: string, // (Optional) if you want a smaller text displayed below the title
  location: EntityLocation[], // (Optional) defines where the shelf is located (Purely meta data)
  backgroundColor: string, // (Required) what color to display in the background (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
  outerColor: string, // (Required) what color the shelf walls etc. are (Accepted: Any css color or an object with [r: 0-255, g: 0-255, b: 0-255])
  model: ShelfSection[] // (Required) an array of the shelf sections this shelf should contain.
}
```

</details>
<details>
<summary>ShelfSizes</summary>

If you wish to use ShelfSizes you have to add `getShelfSizes` to the imports.

```ts
getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    tbWidth: number,
    lrWidth: number
);

getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    topWidth: number,
    bottomWidth: number,
    rightWidth: number,
    leftWidth: number
);

getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    totalHeight: number,
    totalWidth: number
);

getShelfSizes(
    totalHeight: number,
    totalWidth: number,
    tbWidth: number,
    lrWidth: number
);

getShelfSizes(
    totalHeight: number,
    totalWidth: number,
    topWidth: number,
    bottomWidth: number,
    leftWidth: number,
    rightWidth: number
);

```

</details>

## License

Copyright © 2026 Tarobits
Licensed under the Mozilla Public License 2.0 (MPL-2.0).
See [https://mozilla.org/MPL/2.0/](https://mozilla.org/MPL/2.0/)
