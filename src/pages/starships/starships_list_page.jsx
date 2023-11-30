import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { getPageNoFromUrl } from "../../utils";

const StarshipsListPage = () => {
  // let starshipsList = [];

  // const {data, isLoading, err} = UseFetch(`https://swapi.dev/api/starships/`);
  // if(data != null) {
  //   starshipsList = data.results;
  // }
  // return (
  //   !isLoading && !err ? <>
  //     {starshipsList.map((item, i) => {
  //       const id = item.url
  //       .replace(`https://swapi.dev/api/starships/`, '')
  //       .replace('/', '');
  //       return (
  //         <div className='resource-content' key={i}><Link to={`${id}`}>{i+1}.{item.name}</Link></div>
  //       )
  //     })}
  //   </> : !err ? <><div className="loader"></div></> : <>{err}</>
  // )
  const data = useLoaderData();

  return (
    <>
      <Suspense
        fallback={<div className="loader-container"><div className="loader"></div></div>}
      >
        <div className="container">
          <div className="some-space"></div>
          <Await
            resolve={data.res}
            errorElement={
              <p>Error fetching</p>
            }
          >
            {(res) => {
              const prevPage = getPageNoFromUrl(res.previous);
              const nextPage = getPageNoFromUrl(res.next);
              return (
              <>
              {res.results.map((item, i) => {
                const id = item.url
                .replace(`https://swapi.dev/api/starships/`, '')
                .replace('/', '');
                return (
                  <div className='resource-content' key={i}><Link to={`${id}`}>{prevPage*10+(i+1)}.{item.name}</Link></div>
                )
              })}
              <div className="some-space"></div>
              <div>
                {prevPage && <Link to={`/starships?page=${prevPage}`}>Prev</Link>}
                <> </>
                {nextPage && <Link to={`/starships?page=${nextPage}`}>Next</Link>}
              </div>
              </>
            )}}
          </Await>
        </div>
      </Suspense>
    </>
  )
}

export default StarshipsListPage
