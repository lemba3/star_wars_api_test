import { Outlet, RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import HomePage from './pages/home_page';
// import './css/app.css';
import './css/main.css';
import PlanetListPage from './pages/planets/planets_list_page'
import PlanetDetailPage from './pages/planets/planet_detail_page'
import PeopleDetailPage from './pages/people/people_detail_page'
import PeopleListPage from './pages/people/people_list_page';
import FilmsListPage from './pages/films/films_list_page';
import FilmDetailPage from './pages/films/film_detail_page';
import SpeciesDetailPage from './pages/species/species_detail_page';
import SpeciesListPage from './pages/species/species_list_page';
import VehicleDetailPage from './pages/vehicles/vehicle_detail_page';
import VehiclesListPage from './pages/vehicles/vehicles_list_page';
import StarshipDetailPage from './pages/starships/starship_detail_page';
import StarshipsListPage from './pages/starships/starships_list_page';
import { getPageNoFromUrl } from './utils';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
        {
          path: 'people',
          element: <><h4>People</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <PeopleListPage />,
              // loader: (route) => myLoader(`https://swapi.dev/api/people/`, route)
            },
            {
              path: ':id',
              element: <PeopleDetailPage />,
              // loader: (route) => myLoader(`https://swapi.dev/api/people/${route.params.id}`)
            }
          ]
        },
        {
          path: 'planets',
          element: <><h4>Planets</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <PlanetListPage />,
              // loader: (route) => myLoader('https://swapi.dev/api/planets/', route)
            },
            {
              path: ':id',
              element: <PlanetDetailPage />,
              // loader: (route) => myLoader(`https://swapi.dev/api/planets/${route.params.id}`)
            },
          ]
        },
        {
          path: 'films',
          element: <><h4>Films</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <FilmsListPage />,
              loader: (route) => myLoader('https://swapi.dev/api/films/', route)
            },
            {
              path: ':id',
              element: <FilmDetailPage />,
              loader: (route) => myLoader(`https://swapi.dev/api/films/${route.params.id}`)
            }
          ]
        },
        {
          path: 'species',
          element: <><h4>Species</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <SpeciesListPage />,
              // loader: (route) => myLoader('https://swapi.dev/api/species/', route)
            },
            {
              path: ':id',
              element: <SpeciesDetailPage />,
              // loader: (route) => myLoader(`https://swapi.dev/api/species/${route.params.id}`)
            }
          ]
        },
        {
          path: 'vehicles',
          element: <><h4>Vehicles</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <VehiclesListPage />,
              loader: (route) => myLoader('https://swapi.dev/api/vehicles/', route)
            },
            {
              path: ':id',
              element: <VehicleDetailPage />,
              loader: (route) => myLoader(`https://swapi.dev/api/vehicles/${route.params.id}`)
            }
          ]
        },
        {
          path: 'starships',
          element: <><h4>Starships</h4> <Outlet /> </>,
          children: [
            {
              index: true,
              element: <StarshipsListPage />,
              loader: (route) => myLoader('https://swapi.dev/api/starships/', route)
            },
            {
              path: ':id',
              element: <StarshipDetailPage />,
              loader: (route) => myLoader(`https://swapi.dev/api/starships/${route.params.id}`)
            }
          ]
        },
    ]
  }
])

const queryClient = new QueryClient();

function App() {

  // return (
  //   <>
  //     <StarWars />
  //   </>
  // )
  return  (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function myLoader(url, route) {
  if(route){
    const pageNo = getPageNoFromUrl(route.request.url) || 1;
    url = url+`?page=${pageNo}`;
  }
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

export default App
