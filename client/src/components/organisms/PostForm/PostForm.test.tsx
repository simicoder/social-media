import React from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '../../../utils/testUtils';
import { Form } from './PostForm';
import { userRes } from '../../../test/data';

describe('new post form', () => {
  test('successful post send', async () => {
    const mockHandleSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
    const mockFunction = jest.fn();

    render(
      <Form
        setCurrentId={mockFunction}
        handleSubmit={mockHandleSubmit}
        user={userRes}
        postData={{
          title: '',
          description: '',
        }}
        setPostData={mockFunction}
        croppie={null}
        setCroppie={mockFunction}
        post={null}
      />,
    );

    const title = 'title';
    const description = 'description';
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const inputTitle = screen.getByPlaceholderText('title');
    const inputDescription = screen.getByPlaceholderText('description');
    const inputFile = screen.getByTestId('cropperInput');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.type(inputTitle, title);
    userEvent.type(inputDescription, description);

    await act(async () => userEvent.upload(inputFile, file));

    await waitForElementToBeRemoved(inputFile).then(() => {
      act(() => userEvent.click(submitButton));
    });

    expect(mockHandleSubmit).toBeCalledTimes(1);
  });
});
