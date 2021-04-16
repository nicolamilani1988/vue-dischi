function init(){
    new Vue ({
        el: "#app",

        data:{
            records: '', // estraggo dati da server
            recordsFiltered:'', // dischi filtrati che vedo
            genreUnique:[], // array di generi trovati
            chosenGenre: '', // genere scelto dal menu tendina
            chosenSort: '', // tipo di ordinamento scelto dal menu tendina
            icons: ['','','',''],
            titleSearch: '',
            researchedTitle: '',
        },

        methods:{

            showGenre: function(){ // faccio vedere solo genere scelto
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

            sortByYear: function(){ // funzione ordina per anno crescente
                this.recordsFiltered.sort(function(a,b){
                    return a['year']- b['year'];
                })
            },

            sortByYearReverse: function(){ // funzione ordina per anno decrescente
                this.recordsFiltered.sort(function(a,b){
                    return b['year']- a['year'];
                })
            },

            sortByAlphabet: function(){ //funzione ordina per autore AZ
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

            sortByAlphabetReverse: function(){ //funzione ordina per autore ZA
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

            sortRecords: function(){ // scelta del metodo di ordinamento
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

        // update() {
        //     console.log("popo");
        //     this.recordsFiltered = this.records.filter(elem=>{
        //         if(this.records['title'].includes(this.titleSearch)){
        //             return elem;
        //         }
        //     })
                
        // },
    })
    
}

document.addEventListener('DOMContentLoaded',init);
