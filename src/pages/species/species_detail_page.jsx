// import { Suspense } from "react";
import { useQuery } from "react-query";
import {  useParams } from "react-router-dom";

const SpeciesDetailPage = () => {
  // const exclusionList = ['vehicles', 'films', 'homeworld', 'species', 'starships',
  // 'residents', 'characters', 'planets', 'people', 'pilots', 'created', 'edited', 'url'];
  const { id = '1' } = useParams();
  const { data: species, isLoading: isSpeciesLoading, isError, error } = useQuery({
    queryKey: ['species/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/species/${id}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  const { data: homeworld, isLoading: isHomeWorldLoading } = useQuery({
    queryKey: ['homeworld', id],
    queryFn: async () => {
      // if (!species) {
      //   return Promise.reject('Species data not available');
      // }
      const res = await fetch(species.homeworld.toString());

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    },
    enabled: !!species,
  });


  if (isSpeciesLoading || isHomeWorldLoading ) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>{String(error)}</p>
      </div>
    );
  }

  // console.log("data ", data);

// console.log("homeworld", homeworld)

  return (
    <>
      <div className="container">
        <div className="some-space"></div>
        {/* {Object.entries(data).map(([key, value]) => !exclusionList.includes(key) && (
          <div key={key} className="resource-detail"><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span> : {value}</div>
        ))} */}
        {homeworld?.name}
      </div>
    </>
  );
}

export default SpeciesDetailPage
