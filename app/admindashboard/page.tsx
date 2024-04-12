import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import EmptyState from "../components/EmptyState";
import AdminDashboardCllient from "./AdminDashboardClient";
import getListings from "../actions/getListings";

const AdminDashboard = async () => {
  // Fetch the user with the email "admin@admin.com"
  const user = await prisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    }
  });

  // Get the current user
  const currentUser = await getCurrentUser();
  const listing = await getListings({ userId: user?.id });

  // Check if the current user's email matches the admin email
  const isAdminUser = currentUser && currentUser.email === "admin@admin.com";

  // Conditionally render the CreateNewHomeClient component
  return (
    <ClientOnly>
      {isAdminUser ? (
        <AdminDashboardCllient currentUser={currentUser}  listings={listing}/>
      ) : (
        <EmptyState 
        title="You are not Admin"
        subtitle="Only admins can access this page"
        />
      )}
    </ClientOnly>
  );
}

export default AdminDashboard;
