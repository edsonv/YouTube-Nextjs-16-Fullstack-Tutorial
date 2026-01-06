import { Navbar } from "@/components/web/NavBar";

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default SharedLayout;
