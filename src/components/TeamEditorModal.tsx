import Axios from '../libs/api';
import Modal from '../components/Modal/Modal';
import DropDown, { selectedItem } from './Common/DropDown';
import { useEffect, useRef, useState } from 'react';
import { typeList } from '../libs/utils/filter';

interface TeamEditorModalProps {
  teamId?: number;
  teamName?: string;
  setIsOpen: () => void;
  setValues: any;
  values: any;
  apiMode?: string;
  initialTeamCategory?: string;
}

interface InputLabelProps {
  name: string;
  labelId: string;
  labelText: string;
  value?: string;
  placeholder: string;
  className?: string;
  autocomplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLabel = ({
  name,
  labelId,
  labelText,
  placeholder,
  className,
  value = '',
  onChange,
  autocomplete = 'off',
}: InputLabelProps) => {
  return (
    <div className={`flex items-center ${className ? ` ${className}` : ''}`}>
      <label htmlFor={labelId} className="mr-5 font-bold">
        {labelText}
      </label>
      <input
        type="text"
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 rounded-xl bg-[#EBEEF9] px-5 py-4 text-sm outline-none"
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </div>
  );
};

const TeamEditorModal = ({
  teamId,
  teamName,
  setIsOpen,
  values,
  setValues,
  apiMode = 'create',
  initialTeamCategory = 'it',
}: TeamEditorModalProps) => {
  const itemListRef = useRef<selectedItem[]>(typeList);
  const [selectedItem, setSelectedItem] = useState<selectedItem>(
    itemListRef.current.find((item) => item.title === initialTeamCategory) ??
      itemListRef.current[0],
  );

  useEffect(() => {
    setValues({ ...values, teamCategory: selectedItem.title });
  }, [selectedItem]);

  useEffect(() => {
    if (apiMode === 'edit') {
      setSelectedItem(
        itemListRef.current.find(
          (item) => item.title === values.teamCategory.toLowerCase(),
        )!,
      );
    }
  }, [values.teamCategory]);

  const parseLabelFromUrl = (url: string) => {
    if (url.includes('figma')) {
      return 'figma';
    } else if (url.includes('jira')) {
      return 'jira';
    } else {
      return 'notion';
    }
  };

  const handleEditSubmit = () => {
    const requestBody = {
      ...(apiMode === 'edit' && { teamId: teamId?.toString() }),
      title: values.teamName,
      teamType: values.teamCategory.toLowerCase(),
      introduction: values.teamGoal,
      spaceList: [
        ...(values.teamSpace1
          ? [
              {
                spaceId: '1',
                spaceType: parseLabelFromUrl(values.teamSpace1),
                url: values.teamSpace1,
              },
            ]
          : []),
        ...(values.teamSpace2
          ? [
              {
                spaceId: '2',
                spaceType: parseLabelFromUrl(values.teamSpace2),
                url: values.teamSpace2,
              },
            ]
          : []),
        ...(values.teamSpace3
          ? [
              {
                spaceId: '3',
                spaceType: parseLabelFromUrl(values.teamSpace3),
                url: values.teamSpace3,
              },
            ]
          : []),
      ],
    };

    Axios({
      url: '/team',
      data: requestBody,
      method: apiMode === 'edit' ? 'PATCH' : 'POST',
    })
      .then(() => {
        setIsOpen();
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={`${teamName} 팀 정보 수정`}
      setIsOpen={setIsOpen}
      onSubmit={handleEditSubmit}
      cancel="취소"
      submit="정보 수정"
      className="px-32"
    >
      <form>
        <section>
          <div className="flex gap-10">
            <InputLabel
              name="teamName"
              value={values.teamName}
              onChange={(e) =>
                setValues({ ...values, teamName: e.target.value })
              }
              labelId="team-name"
              labelText="팀 이름"
              placeholder="팀 이름을 입력하세요"
              autocomplete="off"
            />
            <DropDown
              width={200}
              color="lightBlue"
              itemList={itemListRef.current}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isCategory
            />
          </div>
          <div className="mt-5">
            <InputLabel
              name="teamGoal"
              value={values.teamGoal}
              onChange={(e) =>
                setValues({ ...values, teamGoal: e.target.value })
              }
              labelId="team-goal"
              labelText="팀 목표"
              placeholder="한 줄 설명(팀의 목표)을 적어주세요."
              className="w-full"
              autocomplete="off"
            />
          </div>
        </section>
        <section className="mt-10 flex flex-col space-y-5">
          <InputLabel
            name="teamSpace1"
            value={values.teamSpace1}
            onChange={(e) =>
              setValues({ ...values, teamSpace1: e.target.value })
            }
            labelId="team-space-1"
            labelText="회의 스페이스 1"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
          <InputLabel
            name="teamSpace2"
            value={values.teamSpace2}
            onChange={(e) =>
              setValues({ ...values, teamSpace2: e.target.value })
            }
            labelId="team-space-2"
            labelText="회의 스페이스 2"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
          <InputLabel
            name="teamSpace3"
            value={values.teamSpace3}
            onChange={(e) =>
              setValues({ ...values, teamSpace3: e.target.value })
            }
            labelId="team-space-3"
            labelText="회의 스페이스 3"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
        </section>
      </form>
    </Modal>
  );
};

export default TeamEditorModal;
