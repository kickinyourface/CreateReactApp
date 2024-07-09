// __mocks__/fetch.js
export const mockFetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        items: [
          {
            id: '1',
            volumeInfo: {
              title: 'React Book',
              imageLinks: { thumbnail: 'http://example.com/thumbnail.jpg' },
            }
          }
        ]
      })
    })
  );
  
  global.fetch = mockFetch;
  