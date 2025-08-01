const appData = {
  url: "https://gist.githubusercontent.com/Qiu1996/ae8a5e71a3209f5b5141276577bc7388/raw/0ee8e36e8f613e05816e0acb6bad1a42d16abf50/gistfile1.txt",
  data: null,
  init(){
    this.getData();
    this.searchData();
  },
  async getData(){
    try{
      const res = await fetch(this.url);
      const data = await res.json();
      this.data = data;
    }catch(err){
      console.log(err);
    }
    this.renderData();
  },
  renderData(matchValue = this.data, searchValue = null){
    const resultItem = document.querySelector("#result_item");
    const resultList = document.querySelector(".result_list");
    const regex = new RegExp(searchValue, "gi");
    
    resultList.innerHTML = "";
    matchValue.forEach(item => {
      const clone = resultItem.content.cloneNode(true);
      const firstName_html = item.first_name.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      const lastName_html = item.last_name.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      clone.querySelector(".first_name").innerHTML = firstName_html;
      clone.querySelector(".last_name").innerHTML = lastName_html;
      resultList.appendChild(clone);
    })
  },
  searchData(){
    const searchInput = document.querySelector(".search");
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value;
      this.matchData(searchValue);
    })
  },
  matchData(searchValue){
    const regex = new RegExp(searchValue, "gi");
    const matchValue = this.data.filter(item => {
      return item.first_name.match(regex) || item.last_name.match(regex);
    })
    this.renderData(matchValue, searchValue);
    console.log(matchValue);
    // item.first_name.match(regex)
    
  }
}

appData.init();