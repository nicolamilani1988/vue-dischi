function init(){
    new Vue ({
        el: "#app",
        data:{
            records: '',
            recordsFiltered:'',
            genreUnique:[],         
            chosenGenre: '',
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
                    console.log(this.genreUnique);
                    // mostro dischi filtrati per genere
                    this.recordsFiltered = this.records;

                })
                .catch(() => console.log('error'))

         
        },
    })
    
}

document.addEventListener('DOMContentLoaded',init);
