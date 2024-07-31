export const dynamic = 'force-dynamic'
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }


  return (
    // <ClientOnly>
    //   <Container>
    //     <div 
    //       className="
    //       mt-14
    //         pt-24
    //         grid 
    //         grid-cols-1 
    //         sm:grid-cols-1 
    //         md:grid-cols-2 
    //         lg:grid-cols-3
    //         xl:grid-cols-4
    //         2xl:grid-cols-6
    //         gap-8
    //       "
    //     >
    //       {listings.map((listing: any) => (
    //         <ListingCard
    //           currentUser={currentUser}
    //           key={listing.id}
    //           data={listing}
    //         />
    //       ))}
    //     </div>
        
    //   </Container>
    // </ClientOnly>
    <div className="text-center text-2xl">
      Under cons for now
    </div>
  )
}

export default Home;