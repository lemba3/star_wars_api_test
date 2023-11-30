import { Suspense } from "react";
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getPageNoFromUrl } from "../../utils";
import { useInfiniteQuery, useQuery } from "react-query";

const PlanetsListPage = () => {
  // let planetsList = [];

  // const {data, isLoading, err} = useLoaderData();
  // if(data != null) {
  //   planetsList = data.results;
  // }
  // return (
  //   !isLoading && !err ? <>
  //     {planetsList.map((item, i) => {
  //       const id = item.url
  //       .replace(`https://swapi.dev/api/planets/`, '')
  //       .replace('/', '');
  //       return (
  //         <div className='resource-content' key={i}><Link to={`${id}`}>{i+1}.{item.name}</Link></div>
  //       )
  //     })}
  //   </> : !err ? <><div className="loader"></div></> : <>{err}</>
  // )

  // const data = useLoaderData();

  // return (
  //   <>
  //     <Suspense
  //       fallback={<div className="loader-container"><div className="loader"></div></div>}
  //     >
  //       <div className="container">
  //         <div className="some-space"></div>
  //         <Await
  //           resolve={data.res}
  //           errorElement={
  //             <p>Error fetching</p>
  //           }
  //         >
  //           {(res) => {
  //             const prevPage = getPageNoFromUrl(res.previous);
  //             const nextPage = getPageNoFromUrl(res.next);
  //             return (
  //             <>
  //             {res.results.map((item, i) => {
  //               const id = item.url
  //               .replace(`https://swapi.dev/api/planets/`, '')
  //               .replace('/', '');
  //               return (
  //                 <div className='resource-content' key={i}><Link to={`${id}`}>{prevPage*10+(i+1)}.{item.name}</Link></div>
  //               )
  //             })}
  //             <div className="some-space"></div>
  //             <div>
  //               {prevPage && <Link to={`/planets?page=${prevPage}`}>Prev</Link>}
  //               <> </>
  //               {nextPage && <Link to={`/planets?page=${nextPage}`}>Next</Link>}
  //             </div>
  //             </>
  //           )}}
  //         </Await>
  //       </div>
  //     </Suspense>
  //   </>
  // )

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['planets/list'],
    queryFn: async ({pageParam = 1}) => {
      const res = await fetch(`https://swapi.dev/api/planets/?page=${pageParam}`);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Could not fetch data');
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => getPageNoFromUrl(lastPage.next)
  })

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
      {data.pages.map(p => {
        return p.results.map(p => {
          const id = p.url
            .replace(`https://swapi.dev/api/planets/`, '')
            .replace('/', '');
          return (
            <div className='resource-content' key={id}><Link to={`${id}`}>{id}.{p.name}</Link></div>
          )
        })
      })}
      <div className="some-space"></div>
      {isFetchingNextPage && 
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
      }
      {hasNextPage && 
      <button onClick={() => fetchNextPage()}>
        Next
      </button>
      }
    </div>
  )

}

export default PlanetsListPage
