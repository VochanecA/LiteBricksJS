function Table(props) {
    const {
        id = 'default-table',
        headers,
        data,
        headerBackgroundColor = '#4CAF50',
        headerTextColor = '#ffffff',
        striped = false,
        stripedColor = '#f2f2f2',
        highlight = false,
        highlightColor = '#e6e6e6',
        centered = false,
        responsive = false,
        columnWidths = [],
        mobileHeaderFontSize = '0.75em'
    } = props;

    const style = VDOM.createElement('style', {}, `
        #${id} {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1rem;
        }
        #${id} th, #${id} td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: ${centered ? 'center' : 'left'};
        }
        #${id} th {
            background-color: ${headerBackgroundColor};
            color: ${headerTextColor};
        }
        ${striped ? `
            #${id} tr:nth-child(even) {
                background-color: ${stripedColor};
            }
        ` : ''}
        ${highlight ? `
            #${id} tr:hover {
                background-color: ${highlightColor};
            }
        ` : ''}
        ${columnWidths.map((width, index) => `
            #${id} th:nth-child(${index + 1}),
            #${id} td:nth-child(${index + 1}) {
                width: ${width};
            }
        `).join('')}
        ${responsive ? `
            @media screen and (max-width: 600px) {
                #${id} thead {
                    font-size: ${mobileHeaderFontSize};
                }
                #${id} th, #${id} td {
                    display: block;
                    width: 100% !important;
                }
                #${id} tr {
                    margin-bottom: 0.625em;
                }
                #${id} td {
                    border: none;
                    position: relative;
                    padding-left: 50%;
                }
                #${id} td:before {
                    content: attr(data-label);
                    position: absolute;
                    left: 6px;
                    width: 45%;
                    padding-right: 10px;
                    white-space: nowrap;
                    font-weight: bold;
                }
            }
        ` : ''}
    `);

    const headerRow = VDOM.createElement('tr', {},
        ...headers.map(header => VDOM.createElement('th', {}, header))
    );

    const rows = data.map(row =>
        VDOM.createElement('tr', {},
            ...row.map((cell, index) => VDOM.createElement('td', { 'data-label': headers[index] }, cell))
        )
    );

    const table = VDOM.createElement('table', { id },
        VDOM.createElement('thead', {}, headerRow),
        VDOM.createElement('tbody', {}, ...rows)
    );

    return VDOM.createElement('div', {}, style, table);
}