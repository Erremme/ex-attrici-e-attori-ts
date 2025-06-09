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
      Array.isArray(dati.most_famous_movies) &&
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

     if (Array.isArray(actresses)){
      
      return actresses.filter(isActress)
     }

    }catch(errore) {
      if(errore instanceof Error){
        console.error("Errore nel recupero dei dati" , errore.message)
      }
    }

    return[]
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