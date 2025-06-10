import type { Actress } from "./types";


function isActress( dati : unknown) : dati is Actress{
  if(
      dati &&
      typeof dati === "object" &&
      "id" in dati &&
      typeof dati.id === "number" &&
      "name" in dati &&
      typeof dati.name === "string" &&
      "birth_year" in dati &&
      typeof dati.birth_year === "number" &&
      "death_year" in dati &&
      (!("death_year" in dati) || typeof dati.death_year === "number" ) && 
       "biography" in dati &&
      typeof dati.biography === "string" &&
      "image" in  dati &&
      typeof dati.image === "string" &&
      "most_famous_movies" in dati &&
      dati.most_famous_movies instanceof Array &&
      dati.most_famous_movies.length === 3 &&
      dati.most_famous_movies.every((m) => typeof m === "string") &&
      "awards" in dati &&
      typeof dati.awards === "string" &&
      "nationality" in dati && 
      typeof dati.nationality === "string"
    ){
      return   true
    }

    return false

}

async function getActress (id: number) : Promise <Actress  | null> {
  try{
    const response = await fetch(`http://localhost:5000/actresses/${id}`)
    if(!response.ok){
      throw new Error("errore HTTP")
    }

    const dati : unknown = await response.json();
    if(!isActress(dati)){
      throw new Error("Formato dati non valido")
    }

    return dati

  }catch(errore){
    if(errore instanceof Error)
    console.error(`Errore durante il recupero dei dati , ${errore.message}`)
     return null 
  }
}


getActress(2)
  .then(actress => {
    if (actress) {
      console.log(actress);
    } else {
      console.log("Attrice non trovata o errore nei dati.");
    }
  })
  .catch(err => console.error(err));


  async function getAllActresses() : Promise < Actress[] > {
    try{
      const response = await fetch("http://localhost:5000/actresses")
    if(!response.ok){
      throw new Error("errore HTTP")
    }

    const actresses :unknown = await response.json()

     if (!(actresses instanceof Array)){
         throw new Error("Formato dei dati non validi")
      
     }

     const validActresses : Actress[] = actresses.filter(isActress)

     return validActresses 

    }catch(errore) {
      if(errore instanceof Error){
        console.error("Errore nel recupero dei dati" , errore.message)
      }

      return[]
    }

    
  }

  getAllActresses()
  .then(actresses => {
    if (actresses) {
      console.log(actresses);
    } else {
      console.log("Attrice non trovata o errore nei dati.");
    }
  })
  .catch(err => console.error(err));

  async function  getActresses(ids : number[]) : Promise <(Actress| null) []>{
    try{
      const promises = ids.map((id) => getActress(id))
      const result = await Promise.all(promises)
      return result

    }catch(errore){
     if(errore instanceof Error){
      console.error("Errore", errore.message)
     }

     return []
    }
  }

  const ids : number[] = [2,3,5]

  getActresses(ids)
  .then(actresses => console.log(actresses))
  .catch(error => console.error(error))