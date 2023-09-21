import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const formHeader = screen.getByTestId("form-header");
  expect(formHeader).toHaveTextContent("İletişim Formu");
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "xyz" } });

  await waitFor(() => {
    const errorMessage = screen.getByText(
      "Hata: ad en az 5 karakter olmalıdır."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("name-input");
  const surnameInput = screen.getByTestId("surname-input");

  userEvent.type(nameInput, "Ahmet");
  userEvent.type(surnameInput, "Yalçınkaya");

  const submitButton = screen.getByTestId("submit-btn");
  userEvent.click(submitButton);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const emailInput = screen.getByTestId("email-input");
  userEvent.type(emailInput, "invalid-email");

  const submitButton = screen.getByTestId("submit-btn");
  userEvent.click(submitButton);
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("name-input");
  const emailInput = screen.getByTestId("email-input");

  userEvent.type(nameInput, "Ahmet");
  userEvent.type(emailInput, "ahmetcan.yalcinkaya55@gmail.com");

  const submitButton = screen.getByTestId("submit-btn");
  userEvent.click(submitButton);
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("name-input");
  const surnameInput = screen.getByTestId("surname-input");
  const emailInput = screen.getByTestId("email-input");

  userEvent.type(nameInput, "Ahmet");
  userEvent.type(surnameInput, "Yalçınkaya");
  userEvent.type(emailInput, "ahmetcan.yalcinkaya55@gmail.com");

  const submitButton = screen.getByTestId("submit-btn");
  userEvent.click(submitButton);
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("name-input");
  const surnameInput = screen.getByTestId("surname-input");
  const emailInput = screen.getByTestId("email-input");
  const messageInput = screen.getByTestId("message-input");

  userEvent.type(nameInput, "Ahmet");
  userEvent.type(surnameInput, "Yalçınkaya");
  userEvent.type(emailInput, "ahmetcan.yalcinkaya55@gmail.com");
  userEvent.type(messageInput, "Message");

  const submitButton = screen.getByTestId("submit-btn");
  userEvent.click(submitButton);
});
