function Table(props) {
    const tableId = `table-${props.id || Math.random().toString(36).substr(2, 9)}`;
    
    const headerStyle = `
        background-color: ${props.headerBackgroundColor || '#f1f1f1'};
        color: ${props.headerTextColor || '#000'};
    `;

    const stripedStyle = props.striped ? `
        tbody tr:nth-child(even) {
            background-color: ${props.stripedColor || '#f2f2f2'};
        }
    ` : '';

    const highlightStyle = props.highlight ? `
        tbody tr:hover {
            background-color: ${props.highlightColor || '#ddd'};
        }
    ` : '';

    const centeredStyle = props.centered ? `
        text-align: center;
    ` : '';

    const columnWidths = props.columnWidths || [];

    const responsiveStyle = props.responsive ? `
        @media screen and (max-width: 600px) {
            .${tableId}-wrapper {
                overflow-x: auto;
            }
            .${tableId}.responsive thead {
                font-size: ${props.mobileHeaderFontSize || '0.8em'};
            }
            .${tableId}.responsive th,
            .${tableId}.responsive td {
                display: block;
                width: 100% !important;
                box-sizing: border-box;
            }
            .${tableId}.responsive tr {
                margin-bottom: 15px;
                display: block;
                border-bottom: 2px solid #ddd;
            }
            .${tableId}.responsive td {
                text-align: right;
                padding-left: 50%;
                position: relative;
                border-bottom: 1px solid #ddd;
            }
            .${tableId}.responsive td::before {
                content: attr(data-label);
                position: absolute;
                left: 6px;
                width: 45%;
                padding-right: 10px;
                white-space: nowrap;
                text-align: left;
                font-weight: bold;
            }
        }
    ` : '';

    return `
        <style>
            .${tableId} th {
                ${headerStyle}
            }
            .${tableId} {
                ${centeredStyle}
            }
            ${stripedStyle}
            ${highlightStyle}
            ${responsiveStyle}
            ${columnWidths.map((width, index) => `.${tableId} th:nth-child(${index + 1}), .${tableId} td:nth-child(${index + 1}) { width: ${width}; }`).join('\n')}
        </style>
        <div class="${tableId}-wrapper">
            <table class="table ${tableId} ${props.responsive ? 'responsive' : ''}">
                <thead>
                    <tr>
                        ${props.headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${props.data.map(row => `
                        <tr>
                            ${row.map((cell, index) => `<td data-label="${props.headers[index]}">${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}