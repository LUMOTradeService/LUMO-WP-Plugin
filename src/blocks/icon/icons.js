const svgContext = require.context(
    '!!@svgr/webpack!../../../assets/icons/48px', 
    false, 
    /\.svg$/
);

export const Icons = svgContext.keys().reduce((icons, file) => {
    const name = file.replace('./', '').replace('.svg', '');
    const IconComponent = svgContext(file).default;
    
    icons[name] = {
        component: IconComponent,
        label: name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')
    };
    
    return icons;
}, {});