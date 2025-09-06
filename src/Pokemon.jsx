import { useEffect } from "react";
import "./index.css";
export const Pokemon = () => {
    
    const API = "https://pokeapi.co/api/v2/pokemon/?offset=24&limit=24";

    const fetchPokemon = async() => {
        try{
            const res = await fetch(API);
            const data = await res.json();
            //console.log(data);

            const detailedPokemonData = data.results.map( async(curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = res.json();
                return data
            });

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        fetchPokemon();
    }, []);

    return <h1>catch them all</h1>

}