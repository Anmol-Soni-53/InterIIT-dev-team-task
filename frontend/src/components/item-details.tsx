import useStore from '@/store';

export default function Details() {
    const itemId = useStore((state) => state.itemId);

    return (
        <>
            {itemId === "" ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-blue-200 to-blue-300 text-center p-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Welcome to the Warehouse Management System
                    </h1>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Manage Your Inventory Efficiently
                    </h3>
                    <p className="mt-4 text-gray-600">
                        Please select a warehouse from the sidebar to view its details and manage your stock effectively.
                    </p>
                    <p className="mt-2 text-gray-500 italic">
                        Your success is our priority! 
                    </p>
                </div>
            ) : (
                <div>hi {itemId}</div>
            )}
        </>
    );
}
