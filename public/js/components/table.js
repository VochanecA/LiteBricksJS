function Table(props) {
    const tableId = `table-${props.id || Math.random().toString(36).substr(2, 9)}`;
    
    // Default style values
    const headerBackgroundColor = props.headerBackgroundColor || '#f1f1f1';
    const headerTextColor = props.headerTextColor || '#000';
    const stripedColor = props.stripedColor || '#f2f2f2';
    const highlightColor = props.highlightColor || '#ddd';
    const mobileHeaderFontSize = props.mobileHeaderFontSize || '0.8em';
    const columnWidths = props.columnWidths || [];

    const headerStyle = `
        background-color: ${headerBackgroundColor};
        color: ${headerTextColor};
    `;

    const stripedStyle = props.striped ? `
        tbody tr:nth-child(even) {
            background-color: ${stripedColor};
        }
    ` : '';

    const highlightStyle = props.highlight ? `
        tbody tr:hover {
            background-color: ${highlightColor};
        }
    ` : '';

    const centeredStyle = props.centered ? `
        th, td {
            text-align: center;
        }
    ` : '';

    const responsiveStyle = props.responsive ? `
        @media screen and (max-width: 600px) {
            .${tableId}-wrapper {
                overflow-x: auto;
                margin: 0 10px; /* Small margin */
            }
            .${tableId}.responsive thead {
                font-size: ${mobileHeaderFontSize};
            }
            .${tableId}.responsive th, .${tableId}.responsive td {
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
            .${tableId} {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1rem;
                table-layout: fixed; /* Ensures columns do not exceed table width */
            }
            .${tableId} th {
                ${headerStyle}
                border: 1px solid #ddd;
                padding: 8px;
            }
            .${tableId} td {
                border: 1px solid #ddd;
                padding: 8px;
            }
            ${centeredStyle}
            ${stripedStyle}
            ${highlightStyle}
            ${responsiveStyle}
            ${columnWidths.map((width, index) => `
                .${tableId} th:nth-child(${index + 1}),
                .${tableId} td:nth-child(${index + 1}) {
                    width: ${width};
                }
            `).join('\n')}
        </style>
        <div class="${tableId}-wrapper">
            <table class="${tableId} ${props.responsive ? 'responsive' : ''}">
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
