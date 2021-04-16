function init(){
    new Vue ({
        el: "#app",
        data:{
            records: '',
            recordsFiltered:'',
            genreUnique:[],         
            chosenGenre: '',
            chosenSort: '',
        },
        methods:{
            showGenre: function(){
                
                this.recordsFiltered=this.records.filter(elem=>{

                    if(elem['genre'].toLowerCase() == this.chosenGenre.toLowerCase()){
                        return elem;
                    } 
                });

                if(this.chosenGenre == ''){
                    alert("scegli un genere valido");
                    this.recordsFiltered = this.records;
                }
                
            },

            sortByYear: function(){
                this.recordsFiltered.sort(function(a,b){
                    return a['year']- b['year'];
                })
            },

            sortByYearReverse: function(){
                this.recordsFiltered.sort(function(a,b){
                    return b['year']- a['year'];
                })
            },

            sortByAlphabet: function(){
                this.recordsFiltered.sort(function(a,b){
                    var nameA = a.author.toUpperCase(); 
                    var nameB = b.author.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });   
            },

            sortByAlphabetReverse: function(){
                this.recordsFiltered.sort(function(a,b){
                    var nameA = a.author.toUpperCase(); 
                    var nameB = b.author.toUpperCase();
                    if (nameA < nameB) {
                      return 1;
                    }
                    if (nameA > nameB) {
                      return -1;
                    }
                    return 0;
                  });   
            },

            sortRecords: function(){
                
                switch(this.chosenSort){
                    case 'alphabetical-AZ':
                        this.sortByAlphabet();
                        break;

                    case 'alphabetical-ZA':
                        this.sortByAlphabetReverse();
                        break;  

                    case 'by-year-growing':
                        this.sortByYear();
                        break;

                    case 'by-year-decreasing' :
                        this.sortByYearReverse();
                        break;
                }
                    

            },
                  
        },

        mounted(){
            
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
                .then(data => {

                    //creo array di dati
                    const res = data['data']['response'];
                    this.records = res;
                    
                    // array con solo valori unitari
                    this.records.forEach(elem => {
                        const record = elem;
                        const genre = record['genre'];
                        if(!this.genreUnique.includes(genre)){
                            this.genreUnique.push(genre);
                        }
                    })

                    // mostro dischi filtrati per genere
                    this.recordsFiltered = this.records;

                })
                .catch(() => console.log('error'))

         
        },
    })
    
}

document.addEventListener('DOMContentLoaded',init);
