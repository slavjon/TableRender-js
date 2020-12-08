class GridView {
    /**
     *  properties
     *  @param [array] _tableClass - css классы оформления
     *  @param [array] data  - выходные данные
     *  @param [array] attribute - управляем что выводим 
     *  @param [array] _element  - куда выводить таблицу
     *  @param [array] _header  - заголовок таблицы
     *  @param [array] _headerClass  - css классы заголовка
     */
    constructor() {
            this._header = '';
            this._headerClass = [];
            this._tableClass = [];
            this._element = '';
            this.attribute = [];
        }
        /**
         * Method Set Header
         */
    setHeader(header) {
            if (typeof header === 'string' && header.trim() != '') {
                this._header = header.trim();
                return true;
            }
            return false;
        }
        /**
         * Method Set Header Classes
         */
    setHeaderClass(headerClass) {
            if (typeof headerClass === 'object') {
                this._headerClass = headerClass;
                return true;
            }
            return false;
        }
        /**
         * Method Set Table Classes
         */
    setTableClass(tableClass) {
            if (typeof tableClass === 'object') {
                this._tableClass = tableClass;
                return true;
            }
            return false;
        }
        /**
         * Method Set Element
         */
    setElement(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        return false;
    }

    /**
     *  Method for show GridViewTable
     */

    render(data) {
        this.setElement(data.element);
        this.setHeaderClass(data.headerClass);
        this.setTableClass(data.tableClass);
        this.attribute = data.attribute;
        this.setHeader(data.header);
        this.data = data.data;
        //Show header
        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this._element).append(header);
        }
        //Show table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });
        //Create table header
        let trHeader = document.createElement('tr');
        for (let key in this.attribute) {
            let th = document.createElement('th');
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label;
            } else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);
        // draw table
        for (let i = 0; i < this.data.length; i++) {
            let dataArr = this.data[i]; // one row
            let tr = document.createElement('tr');
            for (let key in this.attribute) {
                let td = document.createElement('td');
                let value = dataArr[key];
                // check has function
                if (this.attribute[key].value) {
                    value = this.attribute[key].value(dataArr);
                }
                // src attribute
                if (this.attribute[key].src) {
                    td.innerHTML = value;
                } else {
                    td.textContent = value;
                }
                tr.append(td);
            }
            table.append(tr);
        }

        document.querySelector(this._element).append(table);
    }

}