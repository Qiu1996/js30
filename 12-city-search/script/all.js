const appData = {
    url: 'https://gist.githubusercontent.com/Qiu1996/28a8767113120b4172dae9ce32bdb0a5/raw/788569914f0e001dcd3c572b4628f964bfcf853e/TW_PopDensity_111.json',
    data: null,
    cityData: null,
    init(){
        this.getData();
    },
    async getData(){
        try{
            const res= await fetch(this.url);
            const data = await res.json();
            this.data = data.records;
        }catch(err){
            console.log(err);
            return;
        }
        this.getCityData();
        this.renderCity();
    },
    getCityData(){
        const d = this.data.reduce((r, a) => {
            const cityName = a.site_id.slice(0, 3);
            const townName = a.site_id.slice(3);
            if(!r[cityName]){
                r[cityName] = [];
            }
            r[cityName].push(townName);
            return r;
        }, {})
        this.cityData = d;
    },
    renderCity(){
        const selectTemplate_el = document.querySelector('.select-template');
        const selectCity_el = document.querySelector('.select_city');
        for(const city in this.cityData){
            const clone = selectTemplate_el.content.cloneNode(true);
            clone.querySelector('option').textContent = city;
            clone.querySelector('option').value = city;
            selectCity_el.appendChild(clone);
        }
        this.cityEvent(selectCity_el);
    },
    cityEvent(selectCity_el){
        selectCity_el.addEventListener('change', (e) => {
            const selectedCity = e.target.value;
            if (selectedCity) {
                this.renderTown(selectedCity);
            }
        });
    },
    renderTown(cityName){
        const selectTemplate_el = document.querySelector('.select-template');
        const selectTown_el = document.querySelector('.select_town');
        
        const defaultOption = selectTown_el.querySelector('option[value=""]');
        selectTown_el.innerHTML = '';
        if (defaultOption) {
            selectTown_el.appendChild(defaultOption);
        }
        
        this.cityData[cityName].forEach(town => {
            const clone = selectTemplate_el.content.cloneNode(true);
            clone.querySelector('option').textContent = town;
            clone.querySelector('option').value = town;
            selectTown_el.appendChild(clone);
        })
        this.townEvent(cityName, selectTown_el);
    },
    townEvent(cityName, selectTown_el){
        selectTown_el.addEventListener('change', (e) => {
            let str = cityName + e.target.value;
            this.data.filter(item => {
                if(item.site_id === str){
                    this.renderResult(item);
                    return;
                }
            })
        });
    },
    renderResult(item){
        const resultPeople_el = document.querySelector('.result_people');
        const resultArea_el = document.querySelector('.result_area');
        const resultDensity_el = document.querySelector('.result_density');

        resultPeople_el.innerText = item.people_total;
        resultArea_el.innerText = item.area;
        resultDensity_el.innerText = item.population_density;
        console.log(item);
    }

}

appData.init();