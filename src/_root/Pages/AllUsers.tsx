import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queries";
import { useEffect } from "react";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();

  console.log("creators", creators);
  useEffect(() => {
    if (isErrorCreators) {
      toast({ title: "Something went wrong"});
    }
  }, [isErrorCreators, toast]);


  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Accounts</h2>
        {isPending && !creators ? (
          <Loader />
        ): (
          <ul>
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers