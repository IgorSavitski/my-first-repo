import { test, expect } from "@playwright/test";
import { log } from "console";

test.describe("@CRUD methods", () => {
  test.describe.configure({ mode: 'serial' });
  const baseURL = "https://restful-booker.herokuapp.com";
  let id;
  let token;
  const dataForPost = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };
  test("POST method for booking", async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
        data: dataForPost
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.booking).toEqual(dataForPost);
    expect(responseBody).toHaveProperty('bookingid');
    id = responseBody.bookingid;
  });
  test('GET method', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${id}`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toEqual(dataForPost);
  })
  test('PUT method', async ({ request }) => {
    const uodatedData = {
    firstname: "Kevin",
    lastname: "James",
    totalprice: 222,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-07-07",
      checkout: "2025-07-07",
    },
    additionalneeds: "Lunch",
  };
    const authResponse = await request.post(`${baseURL}/auth`, {
        data: {
            username: "admin",
            password: "password123"
        }
    })
    expect(authResponse.ok()).toBeTruthy();
    expect(authResponse.status()).toBe(200);
    const authResponseBody = await authResponse.json();
    expect(authResponseBody).toHaveProperty('token');
    token = authResponseBody.token;
    const response = await request.put(`${baseURL}/booking/${id}`, {
        headers: {
            'Cookie': `token=${token}`
        },
        data: uodatedData
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(uodatedData);
  })
    test('DELETE method', async ({ request }) => {
        const response = await request.delete(`${baseURL}/booking/${id}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        const getResponse = await request.get(`${baseURL}/booking/${id}`);
        expect(getResponse.status()).toBe(404);
    });
}); 
