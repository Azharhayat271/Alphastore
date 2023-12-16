import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux"; // Import the Provider component
import configureStore from "redux-mock-store"; // Import the mock store function
import Header from "../components/Header";

describe("Header component", () => {
  const mockStore = configureStore(); // Create a mock store
  let store; // Declare a store variable

  beforeEach(() => {
    store = mockStore({}); // Initialize the store
  });

  test("renders welcome text based on current hour", () => {
    const { getByText } = render(
      // Wrap the Header component with the Provider component
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Rest of the test code...
  });

  test("calls dispatch with logout action on logoutHandler", () => {
    const { getByText } = render(
      // Wrap the Header component with the Provider component
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Rest of the test code...
  });
});
