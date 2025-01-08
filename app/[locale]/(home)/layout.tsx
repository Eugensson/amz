import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
