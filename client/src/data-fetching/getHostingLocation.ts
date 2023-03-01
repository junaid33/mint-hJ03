export const getHostingLocation = async (subdomain: string) => {
  const hostingLocationResponse = await fetch(
    `${process.env.API_ENDPOINT}/api/v2/internal/deployment/${subdomain}/hosting-location`,
    {
      headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
    }
  );
  const hostingLocation = await hostingLocationResponse.text();
  return hostingLocation;
};
