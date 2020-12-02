import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FormLabel, FormInput, SubmitButton as SB, CancelButton as CB } from '@/styles/shared';
import { flex } from '@/styles/mixin';
import { useUser } from '@/hooks';

const ModalBody = styled.div`
  ${flex()};
  padding: 0 0.5rem;
`;

const UserInfoBox = styled.div``;

const InputDesc = styled.div`
  font-size: ${(props) => props.theme.size.xs};
  font-weight: 200;
  line-height: 1.1rem;
  color: ${(props) => props.theme.color.black7};
`;

const ModalLabel = styled(FormLabel)`
  margin: 1rem 0;
  display: block;
`;

const ProfileImageBox = styled.div`
  margin-left: 1rem;
  ${flex('flex-start', 'center', 'column')};
`;

const ImageHeader = styled.div`
  margin: 0.4rem 0;
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const UploadImageButton = styled(CB)`
  width: 100%;
  outline: 0;
`;

const RemovePhotoButton = styled.button`
  width: 100%;
  height: 2.2rem;
  border: 0;
  outline: 0;
  background-color: unset;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(props) => props.theme.color.blue1};
  &:hover {
    text-decoration: underline;
  }
`;

const UserProfileModalBody: React.FC = () => {
  const { userInfo } = useUser();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(userInfo?.displayName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber ?? '');

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <ModalBody>
      <UserInfoBox>
        <ModalLabel>
          Display name
          <FormInput
            ref={nameInputRef}
            value={displayName}
            onChange={handleDisplayNameChange}
            maxLength={40}
            required
          />
          <InputDesc>
            This could be your first name, or a nickname — however you’d like people to refer to you
            in Slack.
          </InputDesc>
        </ModalLabel>
        <ModalLabel>
          Phone number
          <FormInput value={phoneNumber} onChange={handlePhoneNumberChange} maxLength={20} />
          <InputDesc>Enter a phone number.</InputDesc>
        </ModalLabel>
      </UserInfoBox>
      <ProfileImageBox>
        <ImageHeader>Phofile photo</ImageHeader>
        <ProfileImage src={userInfo?.image as string} />
        <UploadImageButton>Upload an Image</UploadImageButton>
        <RemovePhotoButton>Remove photo</RemovePhotoButton>
      </ProfileImageBox>
    </ModalBody>
  );
};

export default UserProfileModalBody;
