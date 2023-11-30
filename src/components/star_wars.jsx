import Resources from "./resources";
import PeopleList from "./people_list";
import PeopleDetail from "./people_detail";
import PlanetDetail from "./planet_detail";
import PlanetsList from "./planets_list";
import FilmDetail from "./film_detail";
import FilmsList from "./films_list";
import SpeciesDetail from "./species_detail";
import SpeciesList from "./species_list";
import VehicleDetail from "./vehicle_detail";
import VehiclesList from "./vehicles_list";
import StarshipDetail from "./starship_detail";
import StarshipsList from "./starships_list";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import NotFound from "./not_found";
const StarWars = () => {
  // const [path, setPath] = useState(window.location.hash.substring(1));
  // let resource = '';

  // useEffect( () => {
  //   window.addEventListener('hashchange', e => {
  //     const url = new URL(e.newURL);
  //     setPath(url.hash.substring(1));
  //   })
  // }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Resources />,
      loader: () => myLoader('https://swapi.dev/api'),
      // children: <>Hello there...</>
    },
    {
      path: 'people',
      element: <PeopleList />,
      loader: () => myLoader('https://swapi.dev/api/people/')
    },
    {
      path: 'people/:id',
      element: <PeopleDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/people/${route.params.id}`)
    },
    {
      path: 'planets',
      element: <PlanetsList />,
      loader: () => myLoader('https://swapi.dev/api/planets/')
    },
    {
      path: 'planets/:id',
      element: <PlanetDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/planets/${route.params.id}`)
    },
    {
      path: 'films',
      element: <FilmsList />,
      loader: () => myLoader('https://swapi.dev/api/films/')
    },
    {
      path: 'films/:id',
      element: <FilmDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/films/${route.params.id}`)
    },
    {
      path: 'species',
      element: <SpeciesList />,
      loader: () => myLoader('https://swapi.dev/api/species/')
    },
    {
      path: 'species/:id',
      element: <SpeciesDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/species/${route.params.id}`)
    },
    {
      path: 'vehicles',
      element: <VehiclesList />,
      loader: () => myLoader('https://swapi.dev/api/vehicles/')
    },
    {
      path: 'vehicles/:id',
      element: <VehicleDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/vehicles/${route.params.id}`)
    },
    {
      path: 'starships',
      element: <StarshipsList />,
      loader: () => myLoader('https://swapi.dev/api/starships/')
    },
    {
      path: 'starships/:id',
      element: <StarshipDetail />,
      loader: (route) => myLoader(`https://swapi.dev/api/starships/${route.params.id}`)
    },
    {
      path: '/*',
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );

  // if(['people', 'planets', 'films', 'species', 'vehicles', 'starships'].some((word) => {
  //   resource = word;
  //   return path.startsWith(word)
  // })) {
  //   const url = new URL(path, 'http://localhost');
  //   const id = url.searchParams.get('id');

}

function myLoader(url) {
  return defer({
    res: fetch(url)
          .then(res => {
            if(!res.ok){
              throw Error('could not fetch the data')
            }
            return res.json();
          }).catch(err => console.log(err))
  });
}

export default StarWars
