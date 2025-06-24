import DonateForm from '@/components/form/DonateForm';

const DonatePage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-2xl mx-auto px-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Chip in</h1> */}
      <DonateForm />
    </div>
  </div>
);

export default DonatePage;
