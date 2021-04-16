function init(){
    new Vue ({
        el: "#app",
        data:{
            records: '',
            genre : [],
            genreUnique:[],
            recordsFiltered:''
        },
        methods:{
            showGenre: function(){
                console.log("ciao");
                // this.recordsFiltered=this.records.filter(elem=>{
                //     console.log("ciclo", elem['genre']);
                //     console.log("parametr", value);

                //     if(elem['genre'].toLowerCase() == value.toLowerCase()){
                //         return elem;
                //     }
                // });
                // console.log(this.recordsFiltered);
            },
        },

        mounted(){
            
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
                .then(data => {

                    //creo array di dati
                    const res = data['data']['response'];
                    this.records = res;
                    
                    // array con tutti i valori
                    this.genre= this.records.map(elem => {
                        const record = elem;
                        const genre = record['genre'];
                        return genre;
                    })
                    console.log(this.genre);
                    
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
