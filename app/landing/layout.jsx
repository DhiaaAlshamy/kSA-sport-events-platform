export const metadata = {
  title: "KSA Sport Events Platform",
  description: "KSA Sport Events Platform",
};

export default function RootLayout({ children }) {
  return (
    <div class="container mx-auto px-4">
      <header class="bg-white py-4 shadow-md">
        <nav class="flex justify-between items-center">
          <a href="#" class="text-xl font-bold">
            KSA Sports
          </a>
          <div>
            <a href="#about" class="mx-4 hover:text-blue-500">
              About
            </a>
            <a href="#services" class="mx-4 hover:text-blue-500">
              Services
            </a>
            <a href="#contact" class="mx-4 hover:text-blue-500">
              Contact
            </a>
          </div>
        </nav>
      </header>
      {children}
      <footer class="text-center p-4 bg-gray-900 text-white">
        <p>Your company name, 2023</p>
      </footer>
    </div>
  );
}
