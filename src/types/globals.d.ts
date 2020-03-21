interface ColorDefinition {
    name: string;
    shades: ColorShades | string;
}

interface ColorShades {
    [shade: string]: string;
}
