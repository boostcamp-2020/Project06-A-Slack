import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FormLabel, FormInput, SubmitButton as SB, CancelButton as CB } from '@/styles/shared';
import { flex } from '@/styles/mixin';
import { useUserState } from '@/hooks';
import { editUserRequest } from '@/store/modules/user.slice';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';

const Container = styled.form``;

const ModalBody = styled.div`
  ${flex()};
  padding: 0 0.5rem 2rem 0.5rem;
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

export const FileLabel = styled(CB).attrs({ as: 'label' })`
  width: 100%;
  margin-top: 1.5rem;
  background-color: ${(props) => props.theme.color.semiWhite};
  cursor: pointer;
`;

export const FileSelectInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
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

const ModalFooter = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem 0;
  border-radius: 0 0 5px 5px;
  ${flex('center', 'flex-end')};
`;

const CancelButton = styled(CB)`
  margin: 0 0.5rem;
`;
const SubmitButton = styled(SB)`
  margin: 0 0.5rem;
  font-weight: 800;
`;

interface ProfileBodyProps {
  handleClose: () => void;
}

const fileReader = new FileReader();
const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;

const UserProfileModalBody: React.FC<ProfileBodyProps> = ({ handleClose }: ProfileBodyProps) => {
  const dispatch = useDispatch();

  const { userInfo, edit } = useUserState();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(userInfo?.displayName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber ?? '');
  const [profileImage, setProfileImage] = useState<File | undefined | string>(userInfo?.image);

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneNumber.match(phoneNumberRegex)) {
      alert('휴대폰 번호 형식이 올바르지 않습니다.');
      phoneNumberRef.current?.focus();
      return;
    }
    if (userInfo) {
      dispatch(
        editUserRequest({
          userId: userInfo.id,
          displayName,
          phoneNumber,
          profileImage,
          previousFileName: userInfo?.image,
          handleClose,
        }),
      );
    }
  };

  const changeProfileImageView = (image: string) => {
    if (profileImageRef.current) {
      profileImageRef.current.src = image;
    }
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const newImage = e.target?.result;
    changeProfileImageView(newImage as string);
  };

  const removeProfileImage = () => {
    setProfileImage(undefined);
    changeProfileImageView(USER_DEFAULT_PROFILE_URL);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files as FileList;
    if (file[0].size > 5 * 1024 * 1024) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('첨부파일은 5MB 이하의 파일만 첨부 가능합니다.');
      return;
    }
    if (!file[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('이미지 파일만 사용할 수 있습니다.\n(JPG, JPEG, PNG, GIF 포맷)');
      return;
    }
    setProfileImage(file[0]);
    fileReader.readAsDataURL(file[0]);
  };

  useEffect(() => {
    nameInputRef.current?.focus();
    fileReader.addEventListener('load', handleFileRead);
    return () => {
      fileReader.removeEventListener('load', handleFileRead);
    };
  }, []);

  return (
    <Container onSubmit={handleSubmit}>
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
              This could be your first name, or a nickname — however you’d like people to refer to
              you in Slack.
            </InputDesc>
          </ModalLabel>
          <ModalLabel>
            Phone number
            <FormInput
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="010-0000-0000"
              maxLength={13}
              ref={phoneNumberRef}
            />
            <InputDesc>Enter a phone number.</InputDesc>
          </ModalLabel>
        </UserInfoBox>
        <ProfileImageBox>
          <ImageHeader>Phofile photo</ImageHeader>
          <ProfileImage src={userInfo?.image as string} ref={profileImageRef} />
          <FileLabel>
            Upload an image
            <FileSelectInput
              ref={fileInputRef}
              type="file"
              accept="image/jpg, image/jpeg, image/gif, image/png"
              onChange={handleFileChange}
            />
          </FileLabel>
          <RemovePhotoButton type="button" onClick={removeProfileImage}>
            Remove photo
          </RemovePhotoButton>
        </ProfileImageBox>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={handleClose} disabled={edit.loading}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={edit.loading}>
          Save Changes
        </SubmitButton>
      </ModalFooter>
    </Container>
  );
};

export default UserProfileModalBody;
