function Card(props) {
    const cardId = `card-${props.id || Math.random().toString(36).substr(2, 9)}`;
    
    const cardStyle = `
        background-color: ${props.backgroundColor || '#fff'};
        color: ${props.textColor || '#000'};
        ${props.size === 'small' ? 'max-width: 300px;' : 
          props.size === 'large' ? 'max-width: 600px;' : 'max-width: 400px;'}
        ${props.horizontal ? 'display: flex; flex-direction: row;' : ''}
    `;

    const imageHtml = props.image ? `
        <div class="card-image" style="${props.horizontal ? 'flex: 1;' : ''}">
            <img src="${props.image}" alt="${props.imageAlt || 'Card image'}" style="width: 100%; height: ${props.horizontal ? '100%' : 'auto'}; object-fit: cover;">
        </div>
    ` : '';

    const contentStyle = props.horizontal ? 'flex: 2;' : '';

    const fabHtml = props.fab ? `
        <button class="fab" style="position: absolute; right: 16px; bottom: 16px; border-radius: 50%; width: 56px; height: 56px; background-color: ${props.fabColor || '#ff4081'}; color: white; border: none; font-size: 24px; cursor: pointer;">
            ${props.fabIcon || '+'}
        </button>
    ` : '';

    return `
        <style>
            .${cardId} {
                ${cardStyle}
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin: 16px;
                overflow: hidden;
                position: relative;
            }
            .${cardId} .card-header {
                padding: 16px;
                font-size: 20px;
                font-weight: bold;
                border-bottom: 1px solid #eee;
            }
            .${cardId} .card-content {
                padding: 16px;
                ${contentStyle}
            }
        </style>
        <div class="card ${cardId} ${props.panel ? 'card-panel' : ''}">
            ${imageHtml}
            <div>
                ${props.header ? `<div class="card-header">${props.header}</div>` : ''}
                <div class="card-content">${props.content}</div>
            </div>
            ${fabHtml}
        </div>
    `;
}