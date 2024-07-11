import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import MainPage from './pages/MainPage'

import './App.css';

const queryClient = new QueryClient()

function App() {
  // const bears = useStore((state) => state.bears)
  // const increaseBears = useStore(state => state.increasePopulation)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MainPage />

      </div>
    </QueryClientProvider>
  );
}

export default App;
