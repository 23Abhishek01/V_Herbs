import React, { useEffect, useState } from 'react'

// prime react components
import { Paginator } from 'primereact/paginator';

// components
import FilterHerbs from '../components/core/herbs/FilterHerbs';
import HerbCard from '../components/core/herbs/HerbCard'
import HerbCardSkeleton from '../components/core/herbs/HerbCardSkeleton';

// APIs
import { getPublishedHerbs } from '../services/operations/herbsAPIs';
import NoDataAvailable from '../components/common/NoDataAvailable';

// constants
const CARDS_PER_PAGE = 6;

const Herbs = () => {
  // all herbs data
  const [allHerbs, setAllHerbs] = useState([]);

  // herbs data to display
  const [displayHerbs, setDisplayHerbs] = useState([]);

  const [loading, setLoading] = useState(false);
 
  // current page
  const [first, setFirst] = useState(0);

  // get all herbs on first render
  useEffect(() => {
    // function to fetch all herbs
    const fetchHerbs = async () => {
      setLoading(true);
      const result = await getPublishedHerbs();
      setLoading(false);
      setAllHerbs(result);
      setDisplayHerbs(result);
    }

    fetchHerbs();
  }, []);

  
  return (
    <main className='mt-20 md:mt-24 pb-10 min-h-screen'>

        <div className='w-11/12 max-w-[1280px] mx-auto'>
          
          {/* search & filter */}
          <FilterHerbs 
            allHerbs={allHerbs}
            setDisplayHerbs={setDisplayHerbs}
          />

          {/* total herbs count */}
          <div className='mt-8'>
          {
            // herbs count skeleton 
            loading ? (
                <div className='text-center text-2xl uppercase font-semibold tracking-widest animate-pulse'>
                  <p className='h-6 bg-gray-200 rounded w-32 mx-auto'></p>
                </div>
            ) : (
              // herbs count
            <p className='text-center text-2xl uppercase font-semibold tracking-widest'>
              Herbs ({displayHerbs.length})
            </p>
            )
          }
          </div>

          {/* herb cards container*/}
          <div className='mt-10 flex flex-wrap gap-8 justify-center'>
            {
              loading ? (
                // cards skeleton (6)
                [...Array(6)].map((_, index) => (
                  <HerbCardSkeleton key={index}/>
                ))) 
                : (
                // if herbs available display herb cards
                displayHerbs.length !== 0 ? (
                  [...displayHerbs]?.slice(first, first+CARDS_PER_PAGE)?.map((herb) => (
                    <HerbCard herb={herb} key={herb._id}/>
                  ))) 
                  // no data available
                  : (
                    <NoDataAvailable/>
                  )
                )
            }
          </div>

        </div>
        
        {/* paginator */}
        <div className='mt-8'>
        {
          displayHerbs?.length > 0 && (
            <Paginator 
              first={first}
              rows={CARDS_PER_PAGE} 
              totalRecords={displayHerbs?.length}
              onPageChange={(e) => {
                window.scroll({top: 0});
                setFirst(e.first);
              }}
              template={{ layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink' }}
              className='transition-all duration-300 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
            />
          )
        }
        </div>
    </main>
  )
}

export default Herbs