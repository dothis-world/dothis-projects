import Footer from '@/layouts/MainLayout/Footer';
import GNB from '@/layouts/MainLayout/GNB';
import NavSlider from '@/layouts/MainLayout/NavSlide';
import SideBar from '@/layouts/MainLayout/SideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBar />
      <div className="ml-24">
        <GNB />
        <NavSlider />
        <>{children}</>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
