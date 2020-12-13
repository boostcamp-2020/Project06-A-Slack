/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import { flex } from '@/styles/mixin';
import styled from 'styled-components';
import { useUserState } from '@/hooks';
import { createChannelRequest } from '@/store/modules/channel.slice';
import { useDispatch } from 'react-redux';
import { PoundIcon, LockIcon } from '@/components';
import theme from '@/styles/theme';
import { SubmitButton, FormButton, FormInput, FormLabel } from '@/styles/shared';

interface Props {
  secret?: boolean;
  name?: string;
}

const Container = styled.div`
  padding: 0 28px;
`;

const TopDesc = styled.div`
  font-size: ${(props) => props.theme.size.s};
  color: ${(props) => props.theme.color.black6};
  line-height: 1.4;
`;

const Form = styled.form``;

const LabelContent = styled.div`
  font-size: ${(props) => props.theme.size.m};
  margin-right: 10px;
`;

const NameInput = styled(FormInput)`
  width: 100%;
  height: 50px;
  padding: 0 35px;
  font-size: 1rem;
`;

const DescriptionInput = styled(FormInput)`
  width: 100%;
  height: 50px;
  font-size: 1rem;
`;

const InputBox = styled.div<Props>`
  position: relative;
  ${flex()};
  .icon {
    position: absolute;
    top: 27px;
    left: 10px;
    color: ${(props) => props.theme.color.gray2};
  }
`;

const Label = styled(FormLabel)`
  margin: 25px 0;
  display: ${flex('center', 'flex-start', 'column')};
`;

const LabelBox = styled.div`
  ${flex('center', 'flex-start')}
  margin-bottom: 5px;
`;

const NameAlert = styled.span`
  font-size: ${(props) => props.theme.size.s};
  color: ${(props) => props.theme.color.yellow};
  font-weight: 800;
  margin-left: 0.3rem;
`;

const Description = styled.span`
  font-size: ${(props) => props.theme.size.s};
  color: ${(props) => props.theme.color.black7};
  margin-left: 0.3rem;
`;

const Bottom = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Bottomheader = styled.div`
  font-size: ${(props) => props.theme.size.m};
`;

const BottomContent = styled(FormLabel)`
  width: 100%;
  ${flex('center', 'space-between')};
`;

const BottomExplain = styled.div`
  width: 300px;
  word-wrap: break-word;
  color: ${(props) => props.theme.color.gray1};
  font-size: 0.9rem;
  font-weight: 200;
  line-height: 1.4;
`;

const PrivateButton = styled.button<Props>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  padding: 2px;
  border: 1px ${(props) => props.theme.color.gray2} solid;
  ${(props) => (props.secret ? flex('center', 'flex-end') : flex('center', 'flex-start'))};
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
  background-color: ${(props) =>
    props.secret ? props.theme.color.green1 : props.theme.color.white};
  outline: 0;
  cursor: pointer;
`;

const Circle = styled.div<Props>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => props.theme.color.gray2};
  background-color: ${(props) =>
    props.secret ? props.theme.color.white : props.theme.color.gray2};
`;

const ModalFooter = styled.div`
  padding: 20px 0;
`;

const CreateButton = styled(SubmitButton)<Props>`
  margin-left: auto;
  &:disabled {
    cursor: initial;
    color: ${(props) => props.theme.color.black3};
    border: 1px solid ${(props) => props.theme.color.gray6};
    background-color: ${(props) => props.theme.color.gray3};
  }
`;

const IconBox = styled.div``;

interface CreateChannelModalBodyProps {
  setCreateChannelModalVisible: (fn: (state: boolean) => boolean) => void;
  setSecret: (fn: (state: boolean) => boolean) => void;
  secret: boolean;
}

const CreateChannelModalBody: React.FC<CreateChannelModalBodyProps> = ({
  setCreateChannelModalVisible,
  setSecret,
  secret,
}: CreateChannelModalBodyProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { userInfo } = useUserState();
  const dispatch = useDispatch();

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const clickSecret = () => {
    setSecret((state) => !state);
  };

  const clickCreateChannel = async () => {
    const isPublic = secret ? 0 : 1;
    if (userInfo) {
      dispatch(
        createChannelRequest({
          channelInfo: {
            ownerId: userInfo.id,
            channelType: 1,
            isPublic,
            name,
            description,
            memberCount: 1,
          },
          user: userInfo,
        }),
      );
    }
    setCreateChannelModalVisible((state) => !state);
  };

  return (
    <Container>
      <TopDesc>
        Channels are where your team communicates. They’re best when organized around a topic —
        #marketing, for example.
      </TopDesc>
      <Form>
        <Label>
          <LabelBox>
            <LabelContent>
              Name {name === '' && <NameAlert>Don't forget to name your channel.</NameAlert>}
            </LabelContent>
          </LabelBox>
          <InputBox>
            <IconBox className="icon">
              {secret ? (
                <LockIcon size="12px" color={theme.color.black6} />
              ) : (
                <PoundIcon size="12px" color={theme.color.black6} />
              )}
            </IconBox>
            <NameInput
              onChange={changeName}
              value={name}
              required
              placeholder="e.g. plan-budget"
              maxLength={80}
            />
          </InputBox>
        </Label>
        <Label>
          <LabelBox>
            <LabelContent>
              Description<Description>(optional)</Description>
            </LabelContent>
          </LabelBox>
          <DescriptionInput onChange={changeDescription} value={description} />
          <Description>What's this channel about?</Description>
        </Label>
      </Form>
      <Bottom>
        <Bottomheader>Make private</Bottomheader>
        <BottomContent>
          <BottomExplain>
            {secret
              ? `This can’t be undone. A private channel cannot be made public later on.`
              : `When a channel is set to private, it can only be viewed or joined by invitation.`}
          </BottomExplain>
          <PrivateButton secret={secret} onClick={clickSecret}>
            <Circle secret={secret} />
          </PrivateButton>
        </BottomContent>
      </Bottom>
      <ModalFooter>
        <CreateButton type="submit" name={name} onClick={clickCreateChannel} disabled={name === ''}>
          Create
        </CreateButton>
      </ModalFooter>
    </Container>
  );
};

export default CreateChannelModalBody;
