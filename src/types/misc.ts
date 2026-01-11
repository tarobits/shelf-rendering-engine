export type DisplayStyle = {
    color?: string,
    fontWeight?: number,
    classes?: Array<string>
}

export type IdentificationCode = {
    name: string,
    display_name?: string,
    order?: number,
    value: string | Array<string>
}

export type EntityLocation = {
    key: string,
    value: string,
    order: number,
    style?: {
        key?: DisplayStyle,
        value?: DisplayStyle
    }
}

export type RGB = {
    r: number,
    g: number,
    b: number
}

export type Scale = {
    w: number,
    h: number
}