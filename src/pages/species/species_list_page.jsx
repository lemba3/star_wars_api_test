import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Suspense } from "react";
import { getPageNoFromUrl } from "../../utils";
import { useQuery } from "react-query";

const SpeciesListPage = () => {
  // let speciesList = [];

  // const {data, isLoading, err} = UseFetch(`https://swapi.dev/api/species/`);
  // if(data != null) {
  //   speciesList = data.results;
  // }
  // return (
  //   !isLoading && !err ? <>
  //     {speciesList.map((item, i) => {
  //       const id = item.url
  //       .replace(`https://swapi.dev/api/species/`, '')
  //       .replace('/', '');
  //       return (
  //         <div className='resource-content' key={i}><Link to={`${id}`}>{i+1}.{item.name}</Link></div>
  //       )
  //     })}
  //   </> : !err ? <><div className="loader"></div></> : <>{err}</>
  // )
  const [searchParam] = useSearchParams();
  const pageNo = searchParam.get('page') || '1';
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['species/list', pageNo],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/species/?page=${pageNo}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });
  const prevPage = getPageNoFromUrl(data?.previous);
  const nextPage = getPageNoFromUrl(data?.next);

  if (isLoading) {
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

  return (
    <div className="container">
      <div className="some-space"></div>
        {data?.results?.map(p => {
          const id = p.url
            .replace('https://swapi.dev/api/species/', '')
            .replace('/', '');

          return (
            <div className='resource-content' key={id}>
              <Link to={`/species/${id}`}>
                {id} - {p.name}
              </Link>
            </div>
          );
        })}
      <div className="some-space"></div>
      <div>
        {prevPage && <Link to={`?page=${prevPage}`}>Prev</Link>}

        <> </>

        {nextPage && <Link to={`?page=${nextPage}`}>Next</Link>}
      </div>
    </div>
  );
}

export default SpeciesListPage
