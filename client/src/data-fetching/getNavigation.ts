export const getNavigation = async (subdomain: string) => {
  const navigationResponse = await fetch(
    `${process.env.API_ENDPOINT}/api/v2/internal/deployment/${subdomain}/navigation`,
    {
      headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
    }
  );
  return await navigationResponse.json();
};
