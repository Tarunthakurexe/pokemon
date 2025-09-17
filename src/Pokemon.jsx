import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    const [pokemon, setpokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1300";

    const fetchPokemon = async() => {
        try{
            const res = await fetch(API);
            const data = await res.json();
            //console.log(data);

            const detailedPokemonData = data.results.map( async(curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = res.json();
                return data;
            });
        const detaildResponses = await Promise.all(detailedPokemonData);
        setpokemon(detaildResponses);
        setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() =>{
        fetchPokemon();
    }, []);

    const searchData = pokemon.filter((curPokemon) => 
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if(loading){
        return (<div>
            <h1>Loading...</h1>
        </div>);
    }
    if(error){
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    }

    return (
        <section className="container">
            <header>
                <h1>Catch Them All!</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="Search" value = {search} onChange = {(e)=> setSearch(e.target.value)}/>
            </div>
            <div>
                <ul className="cards">
                    {
                        searchData.map((curPokemon) => {
                            return <PokemonCards key = {curPokemon.id} pokemonData = {curPokemon}/>
                        })
                    }
                </ul>
            </div>
        </section>

    );

}
