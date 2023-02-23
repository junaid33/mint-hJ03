import { Accordion as GenericAccordion } from '@mintlify/components';
import { ReactNode, useContext } from 'react';

import AnalyticsContext from '@/analytics/AnalyticsContext';
import { Event } from '@/enums/events';
import { IconType } from '@/types/config';
import { ComponentIcon } from '@/ui/Icon';

function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconType,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen: boolean;
  icon?: ReactNode | string;
  iconType?: IconType;
  children: ReactNode;
}) {
  const analyticsMediator = useContext(AnalyticsContext);
  const trackOpen = analyticsMediator.createEventListener(Event.AccordionOpen);
  const trackClose = analyticsMediator.createEventListener(Event.AccordionClose);

  const onChange = (open: boolean) => {
    if (open) {
      trackOpen({ title });
    } else {
      trackClose({ title });
    }
  };

  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon icon={icon} iconType={iconType} className="w-4 h-4" />
    ) : (
      icon
    );

  return (
    <GenericAccordion
      title={title}
      description={description}
      defaultOpen={defaultOpen}
      onChange={onChange}
      icon={Icon}
    >
      {children}
    </GenericAccordion>
  );
}

export default Accordion;
