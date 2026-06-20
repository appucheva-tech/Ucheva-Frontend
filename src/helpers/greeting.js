export const getGreeting = (name) => {
  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return name ? `${greeting}, ${name}` : greeting;
};
