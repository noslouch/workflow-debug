import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SaveButton from '../SaveButton';

const mockSaveResponse = {
  contentId: 'SB12140738439335043595204587449112906534498',
  articleType: 'World News',
  author: 'Chao Deng',
  contentType: 'article',
  contentUpdatedAt: 1620412740000,
  createdAt: 1620675801397,
  id: 'SB12140738439335043595204587449112906534498',
  mobileHeadline: 'TEST:WHO Endorses China’s Covid-19 Vaccine Sinopharm',
  mobileThumbnailURL: 'https://images.wsj.net/im-335574/?width=76&height=76',
  publishedAt: 1620418260000,
  revision: 1,
  savedAt: {
    '.sv': 'timestamp',
  },
  updatedAt: {
    '.sv': 'timestamp',
  },
  url:
    'https://www.s.dev.wsj.com/articles/test-who-endorses-chinas-covid-19-vaccine-sinopharm-11620418292',
  vxid: '330e616e03a0050bae8c65dec341536f066d946a7b09510acbf090d09a4192f5',
};

const wretchMock = () => {
  return {
    options: () => {
      return {
        get: () => {
          return {
            json: () => Promise.resolve(mockSaveResponse),
          };
        },
        post: () => {
          return {
            json: () => Promise.resolve(mockSaveResponse),
          };
        },
      };
    },
  };
};

jest.mock('wretch', () => wretchMock);

describe('Save Button', () => {
  test('Should update button text when user saves', async () => {
    render(<SaveButton sbid="SB12140738439335043595204587449112906534498" />);
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });
  });
});
