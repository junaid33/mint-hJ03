export const getHiddenPages = async (subdomain: string): Promise<string[]> => {
  const hiddenPagesResponse = await fetch(
    `${process.env.API_ENDPOINT}/api/v2/internal/deployment/${subdomain}/hidden-pages`,
    {
      headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
    }
  );
  const hiddenPages = await hiddenPagesResponse.json();
  return hiddenPages;
};
