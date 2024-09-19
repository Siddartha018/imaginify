import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/dist/server/api-utils';

/**
 * Renders the Add Transformation Type page
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters
 * @param {string} props.params.type - The transformation type
 * @returns {Promise<JSX.Element|Object>} The rendered page component or a redirect object
 */
const AddTransformationTypePage = async ({params:{type}}:SearchParamProps) => {
  const {userId}=auth();
  const transformation=transformationTypes[type];
  if (!userId) {
    if (!userId) {
      // Redirect to the sign-in page if the user is not authenticated
      return {
        redirect: {
          destination: '/sign-in',
          permanent: false,
        },
      };
    }
  }
  const user=await getUserById(userId)
  return (
    <>
<   Header title={transformation.title}
    subtitle={transformation.subTitle}/>
    <TransformationForm
    action='Add'
    userId={user._id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user.creditBalance} />
    </>
    
  )
}

export default AddTransformationTypePage