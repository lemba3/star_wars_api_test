import { Suspense } from "react";
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getPageNoFromUrl } from "../../utils";
import { useQuery } from "react-query";

const PeopleListPage = () => {

  // let peopleList = [];

  // const data = useLoaderData();

  // if(data != null) {
  //   peopleList = data.results;
  // }
  // return (
  //   !isLoading && !err ? <div className="container">
  //     {peopleList.map((item, i) => {
  //       const id = item.url
  //       .replace(`https://swapi.dev/api/people/`, '')
  //       .replace('/', '');
  //       return (
  //         <div className='resource-content' key={i}><Link to={`${id}`}>{i+1}.{item.name}</Link></div>
  //       )
  //     })}
  //   </div> : !err ? <><div className="loader"></div></> : <>{err}</>
  // )

  // return (
  //   <div className="container">
  //     {peopleList.map((item, i) => {
  //       const id = item.url
  //       .replace(`https://swapi.dev/api/people/`, '')
  //       .replace('/', '');
  //       return (
  //         <div className='resource-content' key={i}><Link to={`${id}`}>{i+1}.{item.name}</Link></div>
  //       )
  //     })}
  //   </div>
  // )

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
  //               .replace(`https://swapi.dev/api/people/`, '')
  //               .replace('/', '');
  //               return (
  //                 <div className='resource-content' key={i}><Link to={`${id}`}>{prevPage*10+(i+1)}.{item.name}</Link></div>
  //               )
  //             })}
  //             <div className="some-space"></div>
  //             <div>
  //               {prevPage && <Link to={`/people?page=${prevPage}`}>Prev</Link>}
  //               <> </>
  //               {nextPage && <Link to={`/people?page=${nextPage}`}>Next</Link>}
  //             </div>
  //             </>
  //           )}}
  //         </Await>
  //       </div>
  //     </Suspense>
  //   </>
  // )

  const [searchParam] = useSearchParams();
  const pageNo = searchParam.get('page') || '1';
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['people/list', pageNo],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/people/?page=${pageNo}`);

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
            .replace('https://swapi.dev/api/people/', '')
            .replace('/', '');

          return (
            <div className='resource-content' key={id}>
              <Link to={`/people/${id}`}>
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

export default PeopleListPage
